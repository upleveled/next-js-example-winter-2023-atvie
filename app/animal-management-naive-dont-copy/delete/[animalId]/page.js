import { deleteAnimalById } from '../../../../database/animals';

export default async function DeleteAnimalPage(props) {
  const animal = await deleteAnimalById(props.params.animalId);

  if (!animal) {
    throw new Error('this action failed with Error id: 213123123');
  }

  return <div>animal {animal.firstName} deleted</div>;
}
