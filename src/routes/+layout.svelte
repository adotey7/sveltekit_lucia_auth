<script>
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<div class="main flex h-screen items-center justify-center">
	<Toaster />
	<slot></slot>
</div>
