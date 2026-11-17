/**
 * Radix Slot powers the `asChild` prop: the component renders its child element instead of
 * its default tag, merging props, classes and refs. This is how apps pass framework elements
 * (next/link, next/image) without @repo/ui importing Next.js.
 *
 *   <Button asChild><Link href="/shop">Shop</Link></Button>
 */
export { Slot, Slottable } from "@radix-ui/react-slot";
