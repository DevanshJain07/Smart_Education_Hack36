# Polynomial Regression

# Importing the libraries
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import io
import base64

# Importing the dataset
dataset = pd.read_csv("static/csvs/android.csv")
X = dataset.iloc[:, 1:2].values
y = dataset.iloc[:, 2].values


# Fitting Polynomial Regression to the dataset
poly_reg = PolynomialFeatures(degree=4)
X_poly = poly_reg.fit_transform(X)
poly_reg.fit(X_poly, y)
lin_reg_2 = LinearRegression()
lin_reg_2.fit(X_poly, y)


# def fig_to_base64(fig):
#     img = io.BytesIO()
#     fig.savefig(img, format='png',
#                 bbox_inches='tight')
#     img.seek(0)

#     return base64.b64encode(img.getvalue())



# Visualising the Polynomial Regression results
# fig, ax = plt.subplots()
# plt.scatter(X, y, color='red')
# plt.plot(X, lin_reg_2.predict(poly_reg.fit_transform(X)), color='blue')
# plt.title('Truth or Bluff (Polynomial Regression)')
# plt.xlabel('year')
# plt.ylabel('job vacancy rate')
# plt.show()


# # encoded = fig_to_base64(fig)
# fig.savefig('static/images/android.png')

# Visualising the Polynomial Regression results (for higher resolution and smoother curve)
fig, ax = plt.subplots()
X_grid = np.arange(min(X), max(X), 0.1)
X_grid = X_grid.reshape((len(X_grid), 1))
plt.scatter(X, y, color='red')
plt.plot(X_grid, lin_reg_2.predict(
    poly_reg.fit_transform(X_grid)), color='blue')
plt.title('Truth or Bluff (Polynomial Regression)')
plt.xlabel('year')
plt.ylabel('job vacancy rate')
plt.show()
# plt.savefig('static/images/plot3.png')

fig.savefig('static/images/android.png')
