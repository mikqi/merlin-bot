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
    '1': ['@mrqorib', '@vandyroy',  '@aswindapp', '@naomi_rist'],
    '2': ['@dhinazor', '@mikqi', '@tenosiswono', '@mzakyk26']
  },
  {
    '1': ['@KevinYudistira', '@handrata', '@calvingzhartono', '@shvlla'],
    '2': ['@charlesrandicha', '@brurce', '@msabiqd', '@atikazzahra']
  },
  {
    '1': ['@noviyaniw', '@oliviaputr', '@akbarstd', '@kukuh_hernadi'],
    '2': ['@arkadiusreymond', '@herwando', '@albab21', '@hardarikki']
  }
]

export const DATES = new Date()
export const DATE = DATES.getDate()
export const DAY = DATES.getDay() - 1
export const PPL_VERSION = DATE % 2 !== 0 ? '1' : '2'
