CREATE SCHEMA JsObserver;
CREATE TABLE JsObserver.FunctionCalls (	Id INT NOT NULL AUTO_INCREMENT,
					Function VARCHAR(200),
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));
CREATE TABLE JsObserver.FunctionCallArguments (	FunctionCallId INT NOT NULL,
						Argument TEXT,
						Position TINYINT,
						FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.FunctionCalls(Id));
CREATE TABLE JsObserver.ObservedFunctions (ObservedFunction varchar(200));
INSERT INTO JsObserver.ObservedFunctions VALUES("sessionStorage.setItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("sessionStorage.getItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("localStorage.setItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("localStorage.getItem");
INSERT INTO JsObserver.ObservedFunctions VALUES("postMessage");
INSERT INTO JsObserver.ObservedFunctions VALUES("addEventListener");
