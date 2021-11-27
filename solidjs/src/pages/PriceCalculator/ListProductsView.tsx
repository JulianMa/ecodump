import { Accessor, For } from "solid-js";
import { StoreUpdate, Survivalist } from "./context/createPriceCalculatorStore";
import Table, {
  TableHeader,
  TableHeaderCol,
  TableBody,
} from "../../components/Table";
import SearchInput from "../../components/SearchInput";
import Dropdown from "../../components/Dropdown";
import Tooltip from "../../components/Tooltip";
import Pagination from "../../components/Pagination";
import { filterByTextEqual } from "../../utils/helpers";
import Button from "../../components/Button";
import type { StoreType } from "./context/createPriceCalculatorStore";
import { useMainContext } from "../../hooks/MainContext";
import PersonalPrice from "../../components/PersonalPrice/PersonalPrice";
import AveragePrice from "../../components/AveragePrice";
import { useCalcContext } from "./context/CalcContext";

export default () => {
  const { mainState, update, allCurrencies, allProfessions, allCraftStations } =
    useMainContext();
  const { listProductsStore: props, setSelectedProduct } = useCalcContext();
  return (
    <>
      <div class="flex justify-between">
        <span></span>
        <div class="flex items-center gap-2 mb-2">
          <SearchInput
            value={props.state.search}
            onChange={props.update.setSearch}
          />
          <Dropdown
            value={props.state.filterProfession}
            values={[
              { value: "", text: "Filter by Profession" },
              ...(allProfessions()?.map((name) => ({
                value: name,
                text: name,
              })) ?? []),
            ]}
            onChange={(newValue) =>
              props.update.setFilterProfession(`${newValue}`)
            }
            origin="SE"
            direction="SW"
          />
          <Dropdown
            value={props.state.filterCraftStation}
            values={[
              { value: "", text: "Filter by crafting station" },
              ...(allCraftStations()?.map((name) => ({
                value: name,
                text: name,
              })) ?? []),
            ]}
            onChange={(newValue) =>
              props.update.setFilterCraftStation(`${newValue}`)
            }
            origin="SE"
            direction="SW"
          />
          <Dropdown
            value={mainState.currency}
            values={[
              { value: "", text: "All Currencies" },
              ...(allCurrencies()?.map((name) => ({
                value: name,
                text: name,
              })) ?? []),
            ]}
            onChange={(newValue) => update.currency(`${newValue}`)}
            origin="SE"
            direction="SW"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableHeaderCol>Product Name</TableHeaderCol>
          <TableHeaderCol>Profession/Craft Station</TableHeaderCol>
          <TableHeaderCol>Average price</TableHeaderCol>
          <TableHeaderCol>Personal price</TableHeaderCol>
        </TableHeader>
        <TableBody>
          <For each={props.paginatedProducts()}>
            {(product) => (
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Tooltip
                    text="Click to filter by recipe name"
                    origin="NW"
                    direction="NE"
                  >
                    <button
                      class="px-2 py-1"
                      onClick={() => props.update.setSearch(product.Name)}
                    >
                      {product.Name}
                    </button>
                  </Tooltip>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.RecipeVariants.map((recipeVariant) =>
                    recipeVariant.Recipe.CraftStation.map((craftStation) =>
                      (recipeVariant.Recipe.SkillNeeds.length > 0
                        ? recipeVariant.Recipe.SkillNeeds
                        : [{ Skill: Survivalist, Level: 0 }]
                      ).map((skillNeed) => ({
                        Skill: skillNeed.Skill,
                        SkillLevel: skillNeed.Level,
                        craftStation,
                      }))
                    ).flat()
                  )
                    .flat()
                    // Remove duplicates:
                    .filter(
                      (value, index, self) =>
                        self.findIndex(
                          (t) =>
                            t.Skill === value.Skill &&
                            t.SkillLevel === value.SkillLevel &&
                            t.craftStation === value.craftStation
                        ) === index
                    )
                    // Filter by profession and crafting station filters
                    .filter(
                      (t) =>
                        filterByTextEqual(
                          props.state.filterProfession,
                          t.Skill
                        ) &&
                        filterByTextEqual(
                          props.state.filterCraftStation,
                          t.craftStation
                        )
                    )
                    .map((recipe) => (
                      <div>
                        <>
                          <Tooltip text="Click to filter by profession">
                            <button
                              class="px-2 py-1"
                              onClick={() =>
                                props.update.setFilterProfession(recipe.Skill)
                              }
                            >
                              {recipe.Skill}
                            </button>
                          </Tooltip>
                          {` lvl${recipe.SkillLevel}`}
                        </>
                        {recipe.Skill && ` @ `}
                        <Tooltip text="Click to filter by craft station">
                          <button
                            class="px-2 py-1"
                            onClick={() =>
                              props.update.setFilterCraftStation(
                                recipe.craftStation
                              )
                            }
                          >
                            {recipe.craftStation}
                          </button>
                        </Tooltip>
                      </div>
                    ))}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <AveragePrice
                    name={product.Name}
                    isSpecificItem={true}
                    showPricesForProductsModal={
                      props.update.showPricesForProductsModal
                    }
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {!mainState.currency && "select currency"}
                  {mainState.currency && (
                    <div class="flex">
                      <PersonalPrice personalPriceId={product.Name} />
                      <Button
                        class="ml-2"
                        onClick={() => setSelectedProduct(product.Name)}
                      >
                        Calculate now
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </For>
        </TableBody>
      </Table>
      <Pagination
        currentPage={props.state.currentPage}
        totalPages={props.totalPages()}
        onChange={props.update.setCurrentPage}
      />
    </>
  );
};
