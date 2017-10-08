class tranlst(object):
    def __init__(self):
        self.__translst = {}

    def set_lst(self, ele, ins):
        self.__translst[ele] = ins

    def get_lst(self):
        return self.__translst
    def keys(self):
        return self.__translst.keys()