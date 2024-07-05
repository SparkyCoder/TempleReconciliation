# TempleReconciliation

## Prerequisites

<B>Step 1:</b>
Start by cloning [this](https://github.com/SparkyCoder/TempleReconciliation) GitHub repo to your local machine.

<B>Step 2:</b>
Follow React Native's official documentation for setting up a developer environment [here](https://reactnative.dev/docs/set-up-your-environment). We don't want to make use of their Expo Framework as that would severly limit the developement capabilities of this project.

## Developement

<B>Step 1:</b> Plug an android device into your computer with a USB data cable.

<B>Step 3:</b> Ensure USB Debugging is enabled on your Android device and that you're a `developer`

<B>Step 3:</b> Verify the device is seen by running `adb devices` in your terminal.

<B>Step 4:</b> Launch the application by running `npm run android`. This will install and launch the app on your physical device.

## Helpful Links

[Gluestack UI Components](https://gluestack.io/ui/docs/home/overview/all-components)
[react-native-html-to-pdf](https://github.com/christopherdro/react-native-html-to-pdf)
[react-native-file-viewer](https://github.com/vinzscam/react-native-file-viewer)

## PR Approval

- Typescript interfaces for all objects and functions.
- Views are made up individual functional components.
- Business logic is contained within custom hooks.
- Global state is maintained within a Reducer.
- Local state is maintained only within the functional component.
- Unit Tests for each view
- Commit messages are detailed
- Changes are fully tested and working before checking in.

## Architecture

![Architecture Diagram](https://github.com/SparkyCoder/TempleReconciliation/blob/main/Architecture.jpg)

## Api Gateway Routes

- GET `/v1/users`
- GET `/v1/payments`
- GET `/v1/donations/types`
- GET `/v1/donations/pins`
- POST `/v1/donations`

## DB Cost Estimate:

- 100,000 read and write units per month
- 2 Gig storage size
- On Demand payment structure

![Cost Estimate](https://github.com/SparkyCoder/TempleReconciliation/blob/main/Estimate.jpg)

## Dynamo DB Examples

### Donation Types:

```
{
  "PK": {
    "S": "GMT#DONATION#TYPE"
  },
  "SK": {
    "S": "311038f1-7724-4e33-b703-5238c5d8b272"
  },
  "Data": {
    "M": {
      "items": {
        "L": [
          {
            "M": {
              "label": {
                "S": "Food"
              }
            }
          },
          {
            "M": {
              "label": {
                "S": "Flower"
              }
            }
          },
          {
            "M": {
              "label": {
                "S": "Fruit"
              }
            }
          },
          {
            "M": {
              "label": {
                "S": "Fund Raising"
              }
            }
          },
          {
            "M": {
              "items": {
                "L": [
                  {
                    "M": {
                      "label": {
                        "S": "Social Education Class"
                      }
                    }
                  },
                  {
                    "M": {
                      "label": {
                        "S": "Chinese School"
                      }
                    }
                  }
                ]
              },
              "label": {
                "S": "Classes"
              }
            }
          },
          {
            "M": {
              "label": {
                "S": "Dharma Protector"
              }
            }
          },
          {
            "M": {
              "label": {
                "S": "General Donation"
              }
            }
          },
          {
            "M": {
              "label": {
                "S": "Other"
              }
            }
          }
        ]
      },
      "label": {
        "S": "General Donation"
      }
    }
  }
}
```

### Front Desk Pins:

```
{
  "PK": {
    "S": "GMT#FRONTDESK#PIN"
  },
  "SK": {
    "S": "edda4105-71dc-411c-9afd-3a883936bf00"
  },
  "Data": {
    "M": {
      "frontDeskAttendee": {
        "S": "Gloria Chu 莊杏珠"
      },
      "pin": {
        "S": "744b93f9950fc38dad705556931ea48193b99dcb191cc9bd77097f65fbe2f0b8"
      }
    }
  }
}
```

### Users:

```
{
  "PK": {
    "S": "GMT#USER"
  },
  "SK": {
    "S": "e4d6e4d2-a0a9-47f1-bb32-7810dd39143b"
  },
  "Data": {
    "M": {
      "email": {
        "S": "email@email.com"
      },
      "nameInChinese": {
        "S": ""
      },
      "nameInEnglish": {
        "S": "David Kobuszewski"
      },
      "phone": {
        "S": "555-123-1234"
      }
    }
  }
}
```

### Donations:

```
{
  "PK": {
    "S": "GMT#DONATION"
  },
  "SK": {
    "S": "1719262479"
  },
  "Data": {
    "M": {
      "donationItems": {
        "L": [
          {
            "M": {
              "amount": {
                "N": "2"
              },
              "item": {
                "S": "food"
              },
              "name": {
                "S": "apples"
              }
            }
          },
          {
            "M": {
              "amount": {
                "N": "1"
              },
              "item": {
                "S": "store"
              },
              "name": {
                "S": "new years plushy"
              }
            }
          }
        ]
      },
      "event": {
        "S": "ef55fedd-b26e-4249-a53e-2114123a5e73"
      },
      "paymentOption": {
        "S": "1"
      },
      "user": {
        "S": "e4d6e4d2-a0a9-47f1-bb32-7810dd39143b"
      }
    }
  }
}
```

### Payment:

```
{
  "PK": {
    "S": "GMT#PAYMENT"
  },
  "SK": {
    "S": "611db7bc-547f-49f8-8e7e-c777fa26aaae"
  },
  "Data": {
    "M": {
      "label": {
        "S": "Credit Card"
      },
      "value": {
        "S": "CreditCard"
      }
    }
  }
}
```
