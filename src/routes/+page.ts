import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export async function load({ params }) {
    return redirect(301, `${base}/posts`);
}