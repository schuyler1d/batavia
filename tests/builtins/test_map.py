from .. utils import TranspileTestCase, BuiltinFunctionTestCase


class MapTests(TranspileTestCase):
    pass


class BuiltinMapFunctionTests(BuiltinFunctionTestCase, TranspileTestCase):
    functions = ["map"]

    base_code = """
            class ListLike:
                x = %s
        
                def __iter__(self):
                    return self

                def __next__(self):
                    return self.x.pop()

            def testish(x):
                return %s

            print(map(testish, ListLike()))
            print(map(testish, ListLike()))
            print(map(testish, ListLike()).__next__())
    """
    
    def test_bool(self):
        self.assertCodeExecution(self.base_code % ("[True,False,True]", "bool(x)"))

    #def test_bytearray(self):
    #    self.assertCodeExecution(self.base_code % ("b'123'", "x+2"))        
        
    def test_float(self):
        self.assertCodeExecution(self.base_code % ("[3.14, 2.17, 1.0]", "x > 1"))

    def test_int(self):
        self.assertCodeExecution(self.base_code % ("[1, 2, 3]", "x * 2"))
        
    not_implemented = [
        'test_bytearray',
        'test_bytes',
        'test_class',
        'test_complex',
        'test_dict',
        'test_frozenset',
        'test_list',
        'test_none',
        'test_set',
        'test_str',
        'test_tuple',
    ]
