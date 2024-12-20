import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../components/CustomButton';
import { View } from 'react-native';

// Mock Props
const mockOnPress = jest.fn();

describe('CustomButton Component', () => {
  it('renders with the correct title', () => {
    const { getByText } = render(
      <CustomButton title="Click Me" onPress={mockOnPress} />,
    );
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when button is pressed', () => {
    const { getByText } = render(
      <CustomButton title="Press Me" onPress={mockOnPress} />,
    );
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  // it('renders with the correct background variant', () => {
  //   const { getByTestId } = render(
  //     <CustomButton
  //       title="Secondary"
  //       onPress={mockOnPress}
  //       bgVariant="secondary"
  //       testID="custom-button"
  //     />,
  //   );
  //   const button = getByTestId('custom-button');
  //   expect(button.props.className).toContain('bg-gray-500');
  // });

  it('renders with the correct text variant', () => {
    const { getByText } = render(
      <CustomButton
        title="Danger Text"
        onPress={mockOnPress}
        textVariant="danger"
      />,
    );
    const text = getByText('Danger Text');
    expect(text.props.className).toContain('text-red-100');
  });

  it('renders IconLeft and IconRight if provided', () => {
    const MockIcon = () => <View testID="mock-icon" />;

    const { getAllByTestId } = render(
      <CustomButton
        title="With Icons"
        onPress={mockOnPress}
        IconLeft={MockIcon}
        IconRight={MockIcon}
      />,
    );

    const icons = getAllByTestId('mock-icon');
    expect(icons).toHaveLength(2); // Both IconLeft and IconRight should render
  });

  // it('applies custom className styles', () => {
  //   const { getByTestId } = render(
  //     <CustomButton
  //       title="Custom Class"
  //       onPress={mockOnPress}
  //       className="custom-class"
  //       testID="custom-button"
  //     />,
  //   );
  //   const button = getByTestId('custom-button');
  //   expect(button.props.className).toContain('custom-class');
  // });
});
