import { updateAnimalById } from '../../../../database/animals';

export default async function UpdateAnimalPage(props) {
  const animal = await updateAnimalById(
    props.params.animalId,
    props.searchParams.firstName,
    props.searchParams.type,
    props.searchParams.accessory,
  );
  return (
    <div>
      <h1>animal with id {animal.id} has been updated</h1>
      first name: {animal.firstName}
      <br />
      type: {animal.type}
      <br />
      accessory: {animal.accessory}
    </div>
  );
}
