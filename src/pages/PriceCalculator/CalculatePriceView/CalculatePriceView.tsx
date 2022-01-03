import Button from "../../../components/Button";
import CalculatorRecipeTree from "./CalculatorRecipeTree";
import { useCalcContext } from "../context/CalcContext";
import IngredientsCalc from "./IngredientsCalc";
import ProductsCalc from "./ProductsCalc";
import CalculatorRecipeBreadcrumb from "./CalculatorRecipeBreadcrumb";

export default () => {
  const { priceCalcStore } = useCalcContext();

  return (
    <>
      {priceCalcStore.selectedProduct() !== undefined && (
        <>
          <Button onClick={() => priceCalcStore.setSelectedProduct(undefined)}>
            Back
          </Button>
          <CalculatorRecipeTree />
          <CalculatorRecipeBreadcrumb />
          <IngredientsCalc />
          <ProductsCalc />
        </>
      )}
    </>
  );
};