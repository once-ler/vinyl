import Inferno from 'inferno';
import FormCell from '../Cell/FormCell';
import Label from '../Label/Label';
import Input from './Input';

const ValidatedInput = props => {
  const { error, indicateInvalid, label, growBasis, ...rest } = props;
  return (
    <FormCell growBasis={growBasis}>
      <Label>{label}</Label>
      <Input {...rest}></Input>
      { indicateInvalid && <div className="error">{error}</div> }
    </FormCell>
  );
};

export default ValidatedInput;
