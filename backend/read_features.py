import os
import numpy as np

feature_path = os.path.join(os.getcwd(), "backend/data/features/africa-1994846_1280.npy")
data = np.load(feature_path)
print(data)
