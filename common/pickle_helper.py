import pickle
import inspect
import os

try:
    from django.conf import settings
    work_path = settings.PICKLE_CACHE_DIR
    debug = settings.DEBUG
except:
    work_path = ''
    debug = False

def wrap_pickle_file(key):
    filename = '%s.pkl' % key.rstrip('.pkl')
    return os.path.join(work_path, filename)

def get_pickle(key, creater, auto_pickle=True):
    if not debug:
        return creater()

    if len(inspect.signature(creater).parameters) > 0:
        raise TypeError('creater should be a function with no parameter.')
    try:
        pickle_file = wrap_pickle_file(key)
        with open(pickle_file, 'rb') as f:
            return pickle.load(f)
    except (FileNotFoundError, pickle.UnpicklingError) as ex:
        obj = creater()
        if auto_pickle:
            set_pickle(key, obj)
        return obj

def set_pickle(key, obj):
    pickle_file = wrap_pickle_file(key)
    with open(pickle_file, 'wb') as f:
        pickle.dump(obj, f)


if __name__ == '__main__':
    # test pickle_helper
    def gt():
        return [1,23,31,123,123,12,3]

    get_pickle('z', gt)
