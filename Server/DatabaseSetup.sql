# Creates the overall schema
CREATE SCHEMA JsObserver;

# sessionStorage.setItem
CREATE TABLE JsObserver.SessionStorageSetItem (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.SessionStorageSetItemArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.SessionStorageSetItem(Id));

# sessionStorage.getItem
CREATE TABLE JsObserver.SessionStorageGetItem (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.SessionStorageGetItemArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.SessionStorageGetItem(Id));

# localStorage.setItem
CREATE TABLE JsObserver.LocalStorageSetItem (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.LocalStorageSetItemArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.LocalStorageSetItem(Id));

# localStorage.getItem
CREATE TABLE JsObserver.LocalStorageGetItem (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.LocalStorageGetItemArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.LocalStorageGetItem(Id));

# window.postMessage
CREATE TABLE JsObserver.WindowPostMessage (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.WindowPostMessageArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.WindowPostMessage(Id));

# window.addEventListener
CREATE TABLE JsObserver.WindowAddEventListener (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.WindowAddEventListenerArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.WindowAddEventListener(Id));

# document.cookie (set)
CREATE TABLE JsObserver.DocumentSetCookie (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

CREATE TABLE JsObserver.DocumentSetCookieArguments (	
					FunctionCallId CHAR(36) NOT NULL,
					Argument TEXT,
					Position TINYINT,
					FOREIGN KEY (FunctionCallId) REFERENCES JsObserver.DocumentSetCookie(Id));

# document.cookie (get)
CREATE TABLE JsObserver.DocumentGetCookie (	
					Id CHAR(36) NOT NULL,
					Result TEXT,
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

