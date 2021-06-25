import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import {container} from '../setupTests';

import Hello from "./hello";

it("renders as guest", () => {
    act(() => {
        render(<Hello />, container);
    });
    expect(container.textContent).toBe("Hey, stranger");
});


it("renders as user", () => {
    act(() => {
        render(<Hello name="Jenny" />, container);
    });
    expect(container.textContent).toBe("Hello, Jenny!");

    act(() => {
        render(<Hello name="Margaret" />, container);
    });
    expect(container.textContent).toBe("Hello, Margaret!");
});