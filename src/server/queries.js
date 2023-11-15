import HttpError from '@wasp/core/HttpError.js'

export const getThumbnail = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const thumbnail = await context.entities.Thumbnail.findUnique({
    where: { id: args.id },
    include: { user: true }
  });

  if (!thumbnail) { throw new HttpError(404, `Thumbnail with id ${args.id} not found`) }

  if (thumbnail.userId !== context.user.id) { throw new HttpError(400, `Thumbnail with id ${args.id} does not belong to the authenticated user`) }

  return thumbnail;
}

export const getUserThumbnails = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Thumbnail.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}