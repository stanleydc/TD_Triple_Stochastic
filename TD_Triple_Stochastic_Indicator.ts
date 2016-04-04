#Gold_OB_OS.ts

#price and range declarations
declare lower;
def OB = 80;
def OS = 20;
def HighPrice = high;
def LowPrice = low;
def MidPrice = (high+low)/2;

#input values
input ShortInterval = 5;
input ShortRange = 3;
input Smoothing = 3;
input MidInterval = 17;
input MidRange = 5;
input LongInterval = 28;
input LongRange = 14;

#define short, middle, and long term stochastic parameters
#LowerBound = Middle Price - Lowest Price over the last number of days of the interval
#UpperBound = Highest price during the last Interval of days - Lowest Price over the last Interval of days
#Ratio of the lower bound and upper bound
def ShortLowerBound = MidPrice – Lowest(LowPrice, ShortInterval);
def ShortUpperBound = Highest(HighPrice, ShortInterval) – Lowest(LowPrice, ShortInterval);
def ShortRatio = ShortLowerBound/ShortUpperBound*100;
def MiddleLowerBound = MidPrice – Lowest(LowPrice, MidInterval);
def MiddleUpperBound = Highest(HighPrice, MidInterval) – Lowest(LowPrice, MidInterval);
def MiddleRatio = MiddleLowerBound/MiddleUpperBound*100;
def LongLowerBound = MidPrice – Lowest(LowPrice, LongInterval);
def LongUpperBound = Highest(HighPrice, LongInterval) – Lowest(LowPrice, LongInterval);
def LongRatio = LongLowerBound/LongUpperBound*100;

#Start the plot of the 3 stochastic indicators
plot ShortPlot;
plot MiddlePlot;
plot LongPlot;

#Plot at each point for the average value across the last range of days
ShortPlot = Average(ShortRatio, ShortRange);
MiddlePlot = Average(MiddleRatio, MidRange);
LongPlot = Average(LongRatio, LongRange);

#Set the colors and weights of the plots
ShortPlot.setDefaultColor(color.green);
MiddlePlot.setDefaultColor(color.blue);
MiddlePlot.setLineWeight(2);
LongPlot.setDefaultColor(color.red);
LongPlot.SetLineWeight(3);

#plot overbought and oversold lines
plot OverBought = OB;
OverBought.setDefaultColor(color.DARK_GRAY);
plot MidLine = 50;
Midline.SetDefaultColor(color.white);
plot OverSold = OS;
OverSold.setDefaultColor(color.DARK_GRAY);

#set color of LongPlot to indicate longer term signals
LongPlot.AssignValueColor(if LongPlot < 20 then color.green else if LongPlot >80 then color.orange else color.red);
