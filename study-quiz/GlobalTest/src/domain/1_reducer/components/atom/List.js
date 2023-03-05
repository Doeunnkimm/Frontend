import { DELETE_INGREDIENT } from '../../../../store/1_reducer';

const ReducerQ1List = ({ ingredients, dispatch }) => {
  const onDeleteIngredient = (id) => {
    dispatch(DELETE_INGREDIENT({ id }));
  };

  return (
    <tbody>
      {ingredients.map((ingredient, index) => (
        <tr key={index}>
          <td>{ingredient.name}</td>
          <td>{ingredient.price}</td>
          <td>
            <button onClick={() => onDeleteIngredient(ingredient.id)}>
              삭제
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
export default ReducerQ1List;
