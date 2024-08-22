<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { toast } from 'svelte-sonner';

	import { signUserUp } from '$lib/services/authService.js';

	let email = '';
	let password = '';

	// actions
	const handleSignUp = async () => {
		console.log(email, password);
		try {
			await signUserUp(email, password);
			toast.success('User signed up successfully', { duration: 3000 });
		} catch (error) {
			if (error instanceof Error) {
				console.log(error);
				toast.error(error.message, { duration: 3000 });
			}
		}
	};
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign up</Card.Title>
		<Card.Description>Enter your email below to sign up.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" bind:value={email} required />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" bind:value={password} required />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" on:click={handleSignUp}>Sign in</Button>
	</Card.Footer>
	<div class="block w-full pb-5 text-center">
		<a href="/login">Already have an account? Log in</a>
	</div>
</Card.Root>
