# Once the user successfuly log in
# a user instance will be bulid
# And the server will tell this instance where is there db,and where to find
# the required information

class userInstance(object):
    def __init__(self, conn, address,identiId, userLst, dbInstance=None):
        self.__identiId = identiId
        self.__address = address
        self.__conn = conn
        self.__userLst = userLst
        self.__dbInstance = dbInstance
        self.__identify = False
        self.__transUUID = None
        self.__messageQueue = []
        # temperally ,Maybe it should be set in the cluster

    def get_con(self):
        return self.__conn
    def set_db(self,db):
        self.__dbInstance = db
    def dentifyCheck(self):
        if (self.__identiId in self.__userLst):
            self.__identify = True
        else:
            print("this user is already exist")
            # there should be a message send back to client with json
        return self.__identify
    
    def update_userLst(self, newLst):
        self.__userLst = newLst
        
    def set_transUUID(self, newUUID):
        self.__transUUID = newUUID
        
    def get_transUUID(self):
        return self.__transUUID
    
    def add_messageQueue(self,newMessage):
        #add new message in to the queue:
        self.__messageQueue.append(newMessage)
    def get_messageQueue(self):
        return self.__messageQueue
    
    def saveCard(self,cardNumber,holderName,expireDate,csv):
        data = {'CardNumber': cardNumber, 'HolderName': holderName, 'ExpireDate': expireDate, 'CSV': csv}
        try:
            db = self.__dbInstance['Client'][self.__identiId]
            db.insert(data)
        except:
            self.__dbInstance['Client'][self.__identiId]= data
