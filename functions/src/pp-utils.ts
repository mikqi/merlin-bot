export const PPLS = [
  {
    '1': ['@adityafgan', '@firliadyta', '@irfanalfarabbi', '@aswindapp'],
    '2': ['@rezafaizarahman', '@danielbintar', '@elelvyra', '@odheta']
  },
  {
    '1': ['@kevingoz', '@vgeraldo', '@fikryd14', '@puputivana'],
    '2': ['@gazandi', '@hamnahs', '@Apreliamaisara', '@ditasav']
  },
  {
    '1': ['@mrqorib', '@vandyroy', '@noviyaniw'],
    '2': ['@dhinazor', '@izzuddin012', '@tenosiswono', '@mfirmannur']
  },
  {
    '1': ['@KevinYudistira', '@handrata', '@calvingzhartono'],
    '2': ['@charlesrandicha', '@brurce', '@msabiqd', '@atikazzahra']
  },
  {
    '1': ['@mikqi', '@erjodi', '@oliviaputr', '@akbarstd'],
    '2': ['@arkadiusreymond', '@herwando', '@albab21']
  }
]

export const DATES = new Date()
export const DATE = DATES.getDate()
export const DAY = DATES.getDay() - 1
export const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'
