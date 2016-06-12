using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Fasterflect;

namespace Zoo.Test.Log
{
    public class LoggerHelper
    {
        private readonly Action<string> output;
        private readonly int maxLineWidth;

        public LoggerHelper(Action<string> output, int maxLineWidth)
        {
            this.output = output;
            this.maxLineWidth = maxLineWidth;
        }

        private int width()
        {
            return this.maxLineWidth - 1;
        }

        public void FormatLine(string format, params object[] args)
        {
            Text(string.Format(format, args));
        }

        public void Text(params string[] list)
        {
            Text(list.AsEnumerable());
        }

        public void Text(IEnumerable<string> list)
        {
            list.ToList().ForEach(output);
        }

        public void Hash(IEnumerable<object> list)
        {
            output(string.Join(",", list)
                .GetHashCode()
                .ToString());
        }

        public void Table<T>(IEnumerable<T> rows, bool forceFullTable = false, int optimalColumnWidth = 10)
        {
            rows = rows.ToArray();

            PropertyInfo[] properties;
            if (!rows.Any())
                properties = typeof (T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            else
                properties = rows.First().GetType().GetProperties(BindingFlags.Public | BindingFlags.Instance);

            properties = properties
                .Where(p => p.Type().IsValueType ||
                            p.Type() == typeof (string))
                .ToArray();

            var headers = properties
                .Select(p => p.Name)
                .ToArray();

            var renderedRows = rows.Select(
                r => properties
                    .Select(p => (p.GetValue(r) ?? "").ToString())
                    .ToArray());

            Table(headers, renderedRows, forceFullTable, optimalColumnWidth);
        }

        public void H1(string format, params object[] args)
        {
            Line();

            H3(format, args);

            Line();
        }

        public void H3(string format, params object[] args)
        {
            var title = string.Format(format, args);

            var totalDashCount = (width() - title.Length - 2);
            if (totalDashCount < 0)
                totalDashCount = 0;

            var text = AlignCentre(title, width() - totalDashCount);

            var startDashCount = Math.Min(totalDashCount, 3);

            text = new string('-', startDashCount) + text + new string('-', totalDashCount - startDashCount);

            output(text);
        }

        public void Table(string[] headers, IEnumerable<string[]> rows, bool forceFullTable = false, int optimalColumnWidth = 10)
        {
            if (!forceFullTable)
            {
                int optimalNoColumns = headers.Length;
                int totalAvailableWidth = width() - headers.Length - 1;
                for (int noShownColumns = headers.Length; noShownColumns > 0; noShownColumns--)
                {
                    optimalNoColumns = noShownColumns;
                    int columnWidth = totalAvailableWidth / noShownColumns;
                    if (columnWidth > optimalColumnWidth)
                        break;
                }

                headers = headers.Take(optimalNoColumns).ToArray();
                rows = rows.Select(r => r.Take(optimalNoColumns).ToArray());
            }

            Line();
            Row(headers);
            Line();
            foreach (var row in rows)
                Row(row);
        }

        public void Line()
        {
            output(new string('-', width()));
        }

        public void Row(params string[] columns)
        {
            if (columns.Any())
            {
                int totalAvailableWidth = width() - columns.Length - 1;
                int columnWidth = totalAvailableWidth / columns.Length;
                int freeSpace = totalAvailableWidth - columnWidth * columns.Length;
                string row = "|";
                foreach (string column in columns)
                {
                    int adjusted = columnWidth;
                    if (freeSpace > 0)
                    {
                        adjusted++;
                        freeSpace--;
                    }
                    row += AlignCentre(column, adjusted) + "|";
                }

                output(row);

                return;
            }

            output("");
        }

        private string AlignCentre(string text, int width)
        {
            if (width > 3)
            {
                text = text.Length > width ? text.Substring(0, width - 3) + "..." : text;

                if (string.IsNullOrEmpty(text))
                {
                    return new string(' ', width);
                }
                else
                {
                    return text.PadRight(width - (width - text.Length) / 2).PadLeft(width);
                }
            }

            return new string(' ', width);
        }
    }
}