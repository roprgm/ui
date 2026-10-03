import { cn } from "cn";
import { type CSSProperties, useState } from "react";

export type Swatch = {
  name: string;
  use?: string;
  /** The sample's classes, such as a fill or a material. */
  className: string;
  style?: CSSProperties;
  attributes?: Record<string, string>;
  /** Whether the sample's fill is the token's value, shown in its place while the sample is hovered. */
  showsFill?: boolean;
};

type Matrix = readonly [Vector, Vector, Vector];
type Vector = readonly [number, number, number];

const multiply = (m: Matrix, v: Vector): Vector => [
  m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
  m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
  m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
];

/** CIE Lab's D50 white to OKLab's D65, by Bradford. */
const toD65: Matrix = [
  [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
  [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
  [0.012314001688319899, -0.020507696433477912, 1.3303659366080753],
];

const toLms: Matrix = [
  [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
  [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
  [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
];

const toOklab: Matrix = [
  [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
  [1.9779985324311684, -2.42859224204858, 0.450593709617411],
  [0.0259040424655478, 0.7827717124575296, -0.8086757660092854],
];

/** CIE Lab, as the browser computes the theme's colors, in OKLCH, as the tokens are written. */
function labToOklch(l: number, a: number, b: number) {
  const fy = (l + 16) / 116;
  const inverse = (t: number) =>
    t ** 3 > 216 / 24389 ? t ** 3 : (116 * t - 16) / (24389 / 27);
  const xyz: Vector = [
    inverse(fy + a / 500) * 0.96422,
    inverse(fy),
    inverse(fy - b / 200) * 0.82521,
  ];
  const lms = multiply(toLms, multiply(toD65, xyz)).map(Math.cbrt) as [
    number,
    number,
    number,
  ];
  const [ok, oa, ob] = multiply(toOklab, lms);
  const chroma = Math.hypot(oa, ob);
  const hue = chroma < 0.002 ? 0 : (Math.atan2(ob, oa) * 180) / Math.PI;
  return `oklch(${Number((ok * 100).toFixed(1))}% ${Number(chroma < 0.002 ? 0 : chroma.toFixed(3))} ${Math.round((hue + 360) % 360)}`;
}

/** A computed color as the tokens are written; any other form as the browser gives it. */
function format(color: string) {
  const match = color.match(
    /^lab\(([-\d.e]+)%? ([-\d.e]+) ([-\d.e]+)(?: \/ ([\d.]+))?\)$/,
  );
  if (!match) return color;
  const [, l, a, b, alpha] = match;
  const oklch = labToOklch(Number(l), Number(a), Number(b));
  return alpha ? `${oklch} / ${alpha})` : `${oklch})`;
}

/** Each token with its sample, and what it's for. */
export function SwatchList({ items }: { items: Swatch[] }) {
  const [value, setValue] = useState<{ name: string; fill: string }>();
  return (
    <table className="w-full table-fixed text-left">
      <colgroup>
        <col className="w-3/5 sm:w-64" />
        <col />
      </colgroup>
      <thead className="text-xs text-muted">
        <tr>
          <th className="pb-1 font-normal">Token</th>
          <th className="pb-1 font-normal">Use it for</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.name}>
            <td className="py-1.5 pr-4">
              <span className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn("size-5 shrink-0 rounded-sm", item.className)}
                  style={item.style}
                  onPointerEnter={(event) =>
                    item.showsFill &&
                    setValue({
                      name: item.name,
                      fill: format(
                        getComputedStyle(event.currentTarget).backgroundColor,
                      ),
                    })
                  }
                  onPointerLeave={() => setValue(undefined)}
                  {...item.attributes}
                />
                <code className="truncate rounded-sm bg-level-4 px-1.25 py-px font-mono text-xs text-foreground">
                  {value?.name === item.name ? value.fill : item.name}
                </code>
              </span>
            </td>
            <td className="py-1.5 text-secondary">{item.use}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
