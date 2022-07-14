import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
import TodoItem from "../TodoItem";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../store";

describe("Snapshot test ListItem", () => {
    
    const item = {
            id: 33,
            name: "See a movie",
            status: false,
    }

        
    it("renders correctly", () => {
        const tree = renderer.create(
                <Provider store={store}>
                    <TodoItem id={item.id} name={item.name} status={item.status}/>
                </Provider>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});


  