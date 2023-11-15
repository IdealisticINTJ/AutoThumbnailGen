import HttpError from '@wasp/core/HttpError.js'

export const createThumbnail = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Thumbnail.create({
    data: {
      title: args.title,
      level: args.level,
      image: args.image,
      user: { connect: { id: context.user.id } }
    }
  })
}

export const updateThumbnail = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const thumbnail = await context.entities.Thumbnail.findUnique({
    where: { id: args.id }
  })

  if (!thumbnail) { throw new HttpError(400) }

  if (thumbnail.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Thumbnail.update({
    where: { id: args.id },
    data: {
      title: args.title,
      level: args.level,
      image: args.image
    }
  })
}

export const deleteThumbnail = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const thumbnail = await context.entities.Thumbnail.findUnique({
    where: { id: args.thumbnailId }
  })

  if (!thumbnail) { throw new HttpError(400) }

  if (thumbnail.userId !== context.user.id) { throw new HttpError(403) }

  await context.entities.Thumbnail.delete({
    where: { id: args.thumbnailId }
  })

  return true
}