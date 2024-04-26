import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    return redirect(301, `/posts`);
}