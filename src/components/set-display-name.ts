import { ComponentType } from "react";

const setDisplayName = <T>(
  component: ComponentType<T>,
  { name }: { readonly name: string },
  ...rest: Array<Readonly<{ displayName?: string; name: string }>>
): void => {
  component.displayName = `${name}(${rest
    .map(x => x.displayName || x.name)
    .join(", ")})`;
};

export default setDisplayName;
