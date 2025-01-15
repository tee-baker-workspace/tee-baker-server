/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';

// Step 1: Create the constraint class
@ValidatorConstraint({ async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const password = args.object[relatedPropertyName];
    return confirmPassword === password; // Check if confirmPassword matches password
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return 'Password and confirm password do not match';
  }
}

// Step 2: Create the custom decorator
export function MatchPassword(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchPasswordConstraint,
    });
  };
}
