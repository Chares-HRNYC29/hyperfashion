import { combineReducers } from "redux";
import productListReducer from "./productListReducer";
import productByIdReducer from "./productByIdReducer";
import reviewMetaDataReducer from "./ReviewComponentReducers/reviewMetaDataReducer";
import questionsByIdReducer from "./QnAReducers/questionsByIdReducer";
import reviewDataReducer from "./ReviewComponentReducers/reviewDataReducer";

export default combineReducers({
  productList: productListReducer,
  productById: productByIdReducer,
  prodRating: reviewMetaDataReducer,
  questionsList: questionsByIdReducer,
  reviewList: reviewDataReducer,
});
