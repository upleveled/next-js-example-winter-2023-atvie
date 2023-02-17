import { getAnimals } from '../../../database/animals';
import Dashboard from './Dashboard';

export default async function AnimalAdminPage() {
  const animals = await getAnimals();

  return <Dashboard animals={animals} />;
}
