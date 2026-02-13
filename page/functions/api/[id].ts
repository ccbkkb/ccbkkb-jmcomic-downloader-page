import { simpleGetPhoto } from '../utils/remote';

// Cloudflare Pages Functions
// Context 中包含 params，可以获取文件名中的 [id]
export const onRequest: PagesFunction = async (context) => {
	const photoId = context.params.id as string;

	// 简单的参数校验
	if (!photoId || Number.isNaN(parseInt(photoId))) {
		return Response.json(
			{
				message: 'pathname should be /api/${id}, where id is an integer',
			},
			{
				status: 400,
				statusText: 'Bad Request',
			},
		);
	}

	try {
		const photo = await simpleGetPhoto(photoId);
		if (photo === null) {
			return Response.json(
				{
					message: 'photo not found',
				},
				{
					status: 404,
					statusText: 'Not Found',
				},
			);
		}
		return Response.json(photo);
	} catch (error) {
		return Response.json(
			{
				message: 'Internal Server Error',
				error: String(error),
			},
			{
				status: 500,
				statusText: 'Internal Server Error',
			},
		);
	}
};