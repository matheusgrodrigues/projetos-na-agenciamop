import { config } from "../../../../../../theme/stitches.config";

const { white, primaria, secundaria, apoio, h1secundario, h2, h3 } = config.theme.colors;

export const components_section_galeria_carrossel: ThemeComponent[] = [
  {
    id: 1,
    component_name: "title",
    is_active: true,
    styles: {
      color: "#FDFDFD",
    },
  },
  {
    id: 2,
    component_name: "carrossel",
    is_active: true,
    styles: {},
  },
  {
    id: 3,
    component_name: "carrossel-slide-text",
    is_active: true,
    styles: {
      color: "#000000",
    },
  },
];
