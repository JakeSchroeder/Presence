import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../utils";

const StyledInput = styled.input`
  outline: 0;
  padding: 2px 10px 5px 10px;
  border: 0;
  background: ${Colors.light};
  font-size: 19px;
  color: ${Colors.title};
  width: 100%;
`;

const useInput = ({ type, id }) => {
  const [value, setValue] = useState("");
  const input = (
    <StyledInput
      id={id}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type={type}
    />
  );
  return [value, input];
};

export default useInput;
