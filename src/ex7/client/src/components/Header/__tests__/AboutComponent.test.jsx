import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';
import Header from "../Header"

  
test('renders correctly', () => {
    const tree = renderer.create(
      <Header />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });