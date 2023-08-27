import { THEMES } from "../constants";
import { darkPalette, lightPalette } from "./colors";
import { esES } from '@mui/material/locale';

const themesOptions = {
  [THEMES.LIGHT]: {
    palette: lightPalette
  },
  [THEMES.DARK]: {
    palette: darkPalette
  },
  esES
};
export default themesOptions;