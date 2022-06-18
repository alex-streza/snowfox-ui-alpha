export enum Variant {
  Filled = '',
  Outline = 'outline',
  Text = 'text'
}

export type DynamicVariant = Variant & { [key: string]: string };

export const variants = Object.entries(Variant).map(
  ([key, value]: [string, string]) => ({ key, value })
);
