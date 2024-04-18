import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

const defineColorSafelist = (color: string[]) => {
  return color.map(c => [
    `!bg-${c}-200`,
    `bg-${c}-400`,
    `bg-${c}-500`,
    `text-${c}-500`,
    `from-${c}-500`,
    `to-${c}-500`,
  ]).flat()
}

export default defineConfig({
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  safelist: [
    'col-span-1',
    'col-span-2',
    'bg-gradient-to-br',
    ...defineColorSafelist(['rose', 'sky', 'amber', 'orange', 'lime']),
  ]
})