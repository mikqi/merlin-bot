export const PPLS = [
  {
    '1': ['@adityafgan', '@firliadyta', '@mfirmannur'],
    '2': ['@rezafaizarahman', '@danielbintar', '@elelvyra', '@odheta']
  },
  {
    '1': ['@kevingoz', '@vgeraldo', '@fikryd14', '@puputivana'],
    '2': ['@gazandi', '@hamnahs', '@Apreliamaisara', '@ditasav']
  },
  {
    '1': ['@mrqorib', '@vandyroy',  '@aswindapp'],
    '2': ['@dhinazor', '@mikqi', '@tenosiswono']
  },
  {
    '1': ['@KevinYudistira', '@handrata', '@calvingzhartono'],
    '2': ['@charlesrandicha', '@brurce', '@msabiqd', '@atikazzahra']
  },
  {
    '1': ['@noviyaniw', '@oliviaputr', '@akbarstd'],
    '2': ['@arkadiusreymond', '@herwando', '@albab21']
  }
]

export const DATES = new Date()
export const DATE = DATES.getDate()
export const DAY = DATES.getDay() - 1
export const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'
