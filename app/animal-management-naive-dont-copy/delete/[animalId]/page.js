import { deleteAnimalById } from '../../../../database/animals';

export default async function DeleteAnimalPage(props) {
  const animal = await deleteAnimalById(props.params.animalId);
  return <div>animal {animal.firstName} deleted</div>;
}
