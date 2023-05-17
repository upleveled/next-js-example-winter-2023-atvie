import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
} from '../../../../database/animals';
import { Animal } from '../../../../migrations/1675675178-createTableAnimals';

const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string(),
});

export type AnimalResponseBodyGet =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export type AnimalResponseBodyPut =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export type AnimalResponseBodyDelete =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyGet>> {
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

  if (!singleAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: singleAnimal });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyPut>> {
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

  const result = animalSchema.safeParse(body);

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

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: newAnimal });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<AnimalResponseBodyDelete>> {
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

  if (!singleAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ animal: singleAnimal });
}
