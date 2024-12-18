import {
  ColumnBase,
  FormControlGroup,
  FormControl,
  TextField,
} from "@freee_jp/vibes";
import { Route, Routes } from "react-router-dom";

export const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Sample />} />
      <Route path="/b" element={<>bbb</>} />
    </Routes>
  </>
);

const Sample = () => (
  <ColumnBase>
    <FormControlGroup>
      <FormControl label="日付" fieldId="dateField" mb={1} mr={1}>
        <TextField id="dateField" name="dateField" />
      </FormControl>
      <FormControl label="備考" fieldId="noteField" mb={1} mr={1}>
        <TextField id="noteField" name="noteField" />
      </FormControl>
    </FormControlGroup>
  </ColumnBase>
);
