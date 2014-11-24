CREATE SCHEMA JsObserver;
CREATE TABLE JsObserver.FunctionCalls (	Function varchar(200),
								Arguments varchar(1000),
								Result varchar(1000),
								Origin varchar(100),
								Url varchar(300),
								Timestamp timestamp);
CREATE TABLE JsObserver.ObservedFunctions (ObservedFunction varchar(200));
INSERT INTO JsObserver.ObservedFunctions VALUES("sessionStorage.setItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("sessionStorage.getItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("localStorage.setItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("localStorage.getItem");