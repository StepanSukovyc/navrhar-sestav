// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

using System;
#if MS_EXTENSIONS_LOGGING
using Microsoft.Extensions.Internal;
#endif

#if OLD

namespace Gordic.General
{
    /// <summary>
    /// IGLoggerFactory extension methods for common scenarios.
    /// </summary>
    public static class GLoggerFactoryExtensions
    {
        
        /// <summary>
        /// Creates a new <see cref="IGLogger"/> instance using the full name of the given type.
        /// </summary>
        /// <param name="factory">The factory.</param>
        /// <typeparam name="T">The type.</typeparam>
        /// <returns>The <see cref="IGLogger"/> that was created.</returns>
        public static IGLogger<T> CreateLogger<T>(this IGLoggerFactory factory)
        {
            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }
            return new GLogger<T>(factory);
        }

        /// <summary>
        /// Creates a new <see cref="IGLogger"/> instance using the full name of the given <paramref name="type"/>.
        /// </summary>
        /// <param name="factory">The factory.</param>
        /// <param name="type">The type.</param>
        /// <return>The <see cref="IGLogger"/> that was created.</return>
        public static IGLogger CreateLogger(this IGLoggerFactory factory, Type type)
        {
            if (factory == null)
            {
                throw new ArgumentNullException(nameof(factory));
            }

            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }
            // TODO: dodìlat
            return null;
            // return factory.CreateLogger(TypeNameHelper.GetTypeDisplayName(type, includeGenericParameters: false, nestedTypeDelimiter: '.'));
        }
    }
}
#endif
