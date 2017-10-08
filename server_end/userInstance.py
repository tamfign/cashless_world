# Once the user successfuly log in
# a user instance will be bulid
# And the server will tell this instance where is there db,and where to find
# the required information

class userInstance(object):
    #When new user is created, its client instance and address will be recorded 
    def __init__(self, conn, address,identiId, userLst, dbInstance=None):
        self.__identiId = identiId
        self.__address = address
        self.__conn = conn
        self.__userLst = userLst
        self.__dbInstance = dbInstance
        self.__identify = False
        self.__transUUID = None
        self.__messageQueue = []

    # return the client instance for socket connection
    def get_con(self):
        return self.__conn

    # set the database for this particular user 
    def set_db(self,db):
        self.__dbInstance = db
    
    # Check if user is already in the server(userlst)
    # return boolean value
    def dentifyCheck(self):
        if (self.__identiId in self.__userLst):
            self.__identify = True
        else:
            print("this user is already exist")
            # there should be a message send back to client with json
        return self.__identify
    
    # Update user list if necessary
    def update_userLst(self, newLst):
        self.__userLst = newLst
    
    # Update UUID for transaction is necessary    
    def set_transUUID(self, newUUID):
        self.__transUUID = newUUID
    
    # Return UUID 
    def get_transUUID(self):
        return self.__transUUID
    
    # add message to message queue
    def add_messageQueue(self,newMessage):
        #add new message in to the queue:
        self.__messageQueue.append(newMessage)
    
    # Return the messageQueue of particular user
    def get_messageQueue(self):
        return self.__messageQueue
    
    # Save card information to database
    def saveCard(self,cardNumber,holderName,expireDate,csv):
        data = {'CardNumber': cardNumber, 'HolderName': holderName, 'ExpireDate': expireDate, 'CSV': csv}
        try:
            db = self.__dbInstance['Client'][self.__identiId]
            db.insert(data)
        except:
            self.__dbInstance['Client'][self.__identiId]= data
