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
					Data TEXT,
					MessageOrigin VARCHAR(300),
					Origin VARCHAR(300),
					Url TEXT,
					TabUrl TEXT,
					Referrer TEXT,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));


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

# all websites visited with the extension
CREATE TABLE JsObserver.VisitedSites (	
					Id INT NOT NULL AUTO_INCREMENT,
					Url TEXT,
					Origin VARCHAR(300),
					CookieUsed BOOLEAN,
					SessionStorageUsed BOOLEAN,
					LocalStorageUsed BOOLEAN,
					Timestamp TIMESTAMP,
					PRIMARY KEY (Id));

