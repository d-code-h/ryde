import { InputFieldProps } from '@/types/type';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  TextInput,
} from 'react-native';
import clsx from 'clsx';

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={clsx('text-lg font-JakartaSemiBold mb-3', labelStyle)}
          >
            {label}
          </Text>
          <View
            className={clsx(
              'flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500',
              containerStyle,
            )}
          >
            {icon && (
              <Image
                source={icon}
                className={clsx('w-6 h-6 ml-4', iconStyle)}
              />
            )}
            <TextInput
              className={clsx(
                'rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left',
                inputStyle,
              )}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
