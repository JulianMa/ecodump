import { For } from 'solid-js';
import Button from '../../../../components/Button';
import NumericInput from '../../../../components/NumericInput';
import PersonalPrice from '../../../../components/PersonalPrice';
import Table, {
  TableBody,
  TableHeader,
  TableHeaderCol,
} from '../../../../components/Table';
import Tooltip from '../../../../components/Tooltip';
import { useMainContext } from '../../../../hooks/MainContext';
import { fixPercentages } from '../../../../utils/helpers';
import { useCalcContext } from '../../context/CalcContext';

export default () => {
  const { mainState, update } = useMainContext();
  const { priceCalcStore } = useCalcContext();
  return (
    <Table>
      <TableHeader>
        <TableHeaderCol>Product name</TableHeaderCol>
        <TableHeaderCol>Amount</TableHeaderCol>
        <TableHeaderCol>Cost Percentage</TableHeaderCol>
        <TableHeaderCol>Production cost</TableHeaderCol>
        <TableHeaderCol>Retail price</TableHeaderCol>
        <TableHeaderCol>Personal price</TableHeaderCol>
      </TableHeader>
      <TableBody>
        <For each={priceCalcStore.recipeProducts()}>
          {(product) => (
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.Name}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.Ammount}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <NumericInput
                  value={product.costPercentage}
                  onChange={(newValue) =>
                    update.costPercentage(
                      priceCalcStore.variantId(),
                      fixPercentages(
                        priceCalcStore.costPercentages(),
                        product.Name,
                        newValue
                      )
                    )
                  }
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Tooltip noStyle text="Click to set your personal price">
                  <Button
                    onClick={() =>
                      update.personalPrice(
                        product.Name,
                        mainState.currency,
                        product.productionCost
                      )
                    }
                  >
                    {`${product.productionCost} ${mainState.currency}`}
                  </Button>
                </Tooltip>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Tooltip noStyle text="Click to set your personal price">
                  <Button
                    class="px-2 py-1"
                    onClick={() =>
                      update.personalPrice(
                        product.Name,
                        mainState.currency,
                        product.retailPrice
                      )
                    }
                  >
                    {`${product.retailPrice} ${mainState.currency}`}
                  </Button>
                </Tooltip>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <PersonalPrice personalPriceId={product.Name} />
              </td>
            </tr>
          )}
        </For>
      </TableBody>
    </Table>
  );
};