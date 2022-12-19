import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/react-query';
import Router from './router';
import { trpc } from './util/trpc';

export default function Wrappers() {
	const [queryClient] = useState(new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [httpBatchLink({ url: '/trpc' })],
		}),
	);

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</trpc.Provider>
	);
}
