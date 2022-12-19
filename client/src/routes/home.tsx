import { trpc } from '../util/trpc';

export default function Home() {
	const hi = trpc.hello.useQuery('User');
	return (
		<div className='bg-zinc-800 text-white min-h-screen p-2'>
			<div className='mx-auto container'>
				<p>{hi.data || 'Loading...'}</p>
			</div>
		</div>
	);
}
