with hocs

const enhancer = compose(
  withProps(props => ({
    myProp: props.myProp,
  })),
  withState('something', 'setSomething', null),
  withHandlers({
    myFunction: () => () => {
      console.log(`I need help`);
    }
  }),
  lifecycle({
    componentDidMount() {
      console.log('mounted')
    }
  })
);

with hooks

const MyComponent = props => {
  const [something, setSomthing] = useState(null)

  useEffect(() => {
    console.log('mounted')
  }, [])

  const myProp = props.myProp

  const myFunction = () => {
    console.log(`I need help`);
  }
}

---------------------------------------------------------------------------------------------------
Go vs Scala
https://itnext.io/scala-vs-go-3e2e52f19de
---------------------------------------------------------------------------------------------------

src/components/List/List.js:4:import withProps from 'recompose/withProps';
src/components/Input/BorderedValidatedInput.js:2:import toClass from 'recompose/toClass';
src/components/Input/ValidatedInput.js:2:import toClass from 'recompose/toClass';

src/components/Suggest/Suggest.js:5:import withHandlers from 'recompose/withHandlers';
src/components/FileUpload/RenderDropzoneInput.js:3:import lifecycle from 'recompose/lifecycle';
src/components/FileUpload/RenderDropzoneInput.js:4:import withState from 'recompose/withState';
src/components/FileUpload/RenderDropzoneInput.js:5:import withHandlers from 'recompose/withHandlers';
src/components/FileUpload/RenderDropzoneInput.js:6:import toClass from 'recompose/toClass';
src/components/FileUpload/RenderDropzoneInput.js:7:import compose from 'recompose/compose';
src/components/Form/Native/Form.js:5:import defaultProps from 'recompose/defaultProps'
src/components/Form/Native/Form.js:6:import lifecycle from 'recompose/lifecycle'
src/components/Form/Native/Form.js:7:import shouldUpdate from 'recompose/shouldUpdate'
src/components/Form/Native/Form.js:8:import withState from 'recompose/withState'
src/components/Form/Native/Form.js:9:import withHandlers from 'recompose/withHandlers'
src/components/Form/Native/Form.js:10:import compose from 'recompose/compose'
src/components/Container/SlideContainer.js:4:import withProps from 'recompose/withProps';
src/modules/Modal/DefaultModal.js:3:import withProps from 'recompose/withProps';
src/modules/Modal/DefaultModal.js:4:import withHandlers from 'recompose/withHandlers';
src/modules/Modal/DefaultModal.js:5:import compose from 'recompose/compose';
src/modules/Modal/DefaultModal.js:6:import toClass from 'recompose/toClass';
src/modules/Login/Oauth2Login.js:4:import compose from 'recompose/compose';
src/modules/Login/Oauth2Login.js:5:import toClass from 'recompose/toClass';
src/modules/Login/Login.js:4:import compose from 'recompose/compose';
src/modules/Login/Login.js:5:import toClass from 'recompose/toClass';
src/modules/App/Presentation.js:16:import toClass from 'recompose/toClass';
src/modules/App/App.js:4:import compose from 'recompose/compose';
src/modules/App/App.js:5:import toClass from 'recompose/toClass';
src/modules/App/App.js:6:import lifecycle from 'recompose/lifecycle';
src/modules/App/App.js:7:import withPropsOnChange from 'recompose/withPropsOnChange';
src/modules/Home/Home.js:4:import compose from 'recompose/compose';
src/modules/Home/Home.js:5:import withHandlers from 'recompose/withHandlers';
src/modules/Suggest/Suggest.js:4:import withHandlers from 'recompose/withHandlers';
src/modules/Suggest/Suggest.js:5:import withProps from 'recompose/withProps';
src/modules/Suggest/Suggest.js:6:import defaultProps from 'recompose/defaultProps';
src/modules/Suggest/Suggest.js:7:import compose from 'recompose/compose';
src/modules/Calendar/Calendar.js:4:import compose from 'recompose/compose';
src/modules/FileUpload/FileUpload.js:5:import toClass from 'recompose/toClass';
src/modules/FileUpload/FileUpload.js:6:import compose from 'recompose/compose';
src/modules/FileUpload/FileUpload.js:7:import withProps from 'recompose/withProps';
src/modules/ScrollSync/Cell.js:5:import withState from 'recompose/withState';
src/modules/ScrollSync/Cell.js:6:import withHandlers from 'recompose/withHandlers';
src/modules/ScrollSync/Cell.js:7:import compose from 'recompose/compose';
src/modules/ScrollSync/App.js:5:import lifecycle from 'recompose/lifecycle'
src/modules/ScrollSync/Renderer.js:3:import withProps from 'recompose/withProps'
src/modules/ScrollSync/webpack.prod.config.js:61:      'recompose',
src/modules/ScrollSync/webpack.prod.config.js:142:    'recompose': {
src/modules/ScrollSync/webpack.prod.config.js:144:      commonjs2: 'recompose',
src/modules/ScrollSync/webpack.prod.config.js:145:      commonjs: 'recompose',
src/modules/ScrollSync/webpack.prod.config.js:146:      amd: 'recompose',
src/modules/ScrollSync/ScrollSync.js:4:import defaultProps from 'recompose/defaultProps';
src/modules/ScrollSync/ScrollSync.js:5:import withProps from 'recompose/withProps';
src/modules/ScrollSync/ScrollSync.js:6:import compose from 'recompose/compose';
src/modules/SearchLogApp/modules/List/FlatListTab.js:6:import compose from 'recompose/compose'
src/modules/SearchLogApp/modules/App/App.js:5:import lifecycle from 'recompose/lifecycle';
src/modules/SearchLogApp/modules/App/App.js:6:import compose from 'recompose/compose';
src/modules/SearchLogApp/modules/AutoComplete/AutoComplete.js:19:import withHandlers from 'recompose/withHandlers'
src/modules/SearchLogApp/modules/AutoComplete/AutoComplete.js:20:import defaultProps from 'recompose/defaultProps'
src/modules/SearchLogApp/modules/AutoComplete/AutoComplete.js:21:import compose from 'recompose/compose'
src/modules/SearchLogApp/webpack.client.config.js:36:      'recompose',
src/modules/Select/Select.js:4:import {withState, withProps, withHandlers,compose} from 'recompose';
src/modules/SuggestApp/App/PubMed/Suggest.js:1:import {withProps, compose} from 'recompose';
src/modules/SuggestApp/App/PubMed/ScrollSync.js:3:import {withProps, compose} from 'recompose';
src/modules/SuggestApp/App/Reddit/Suggest.js:1:import {withProps, compose} from 'recompose';
src/modules/SuggestApp/App/Reddit/ScrollSync.js:3:import {withProps, compose} from 'recompose';
src/modules/SuggestApp/App/App.js:4:import lifecycle from 'recompose/lifecycle';
src/modules/SuggestApp/App/App.js:5:import compose from 'recompose/compose';
src/modules/SuggestApp/App/EnhancedScrollSync.js:2:import withProps from 'recompose/withProps';
src/modules/SuggestApp/App/EnhancedScrollSync.js:3:import compose from 'recompose/compose';
src/modules/SuggestApp/App/Select/EnhanceSelectForFreezeColumns.js:9:import {withState, withProps, withHandlers, compose} from 'recompose';
src/modules/SuggestApp/webpack.client.config.js:31:      'recompose',
src/modules/CaPatient/CaPatientNameComponents.js:3:import setStatic from 'recompose/setStatic'
src/modules/CaPatient/CaPatientNameComponents.js:4:import withProps from 'recompose/withProps'
src/modules/CaPatient/CaPatientNameComponents.js:5:import compose from 'recompose/compose'
src/modules/CaPatient/CaTableView.js:3:import compose from 'recompose/compose'
src/modules/CaPatient/CaTableView.js:4:import lifecycle from 'recompose/lifecycle'
src/modules/CaPatient/CaTableView.js:5:import withHandlers from 'recompose/withHandlers'
src/modules/CaPatient/CaPatient.js:3:import compose from 'recompose/compose'
src/modules/CaPatient/CaPatient.js:4:import lifecycle from 'recompose/lifecycle'
src/modules/CaPatient/CaPatient.js:5:import withHandlers from 'recompose/withHandlers'
src/modules/CaPatient/CaPatientIdType.js:3:import withProps from 'recompose/withProps'
src/modules/CaPatient/CaPatientIdType.js:4:import compose from 'recompose/compose'
