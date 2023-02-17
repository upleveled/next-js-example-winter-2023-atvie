import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
} from '../../../../database/animals';

const animalType = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const singleAnimal = await getAnimalById(animalId);

  return NextResponse.json({ animal: singleAnimal });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const singleAnimal = await deleteAnimalById(animalId);

  return NextResponse.json({ animal: singleAnimal });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
) {
  const animalId = Number(params.animalId);

  if (!animalId) {
    return NextResponse.json(
      {
        error: 'Animal id is not valid',
      },
      { status: 400 },
    );
  }

  const body = await request.json();

  const result = animalType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties firstName, type and accessory ',
      },
      { status: 400 },
    );
  }

  const newAnimal = await updateAnimalById(
    animalId,
    result.data.firstName,
    result.data.type,
    result.data.accessory,
  );

  return NextResponse.json({ animal: newAnimal });
}
